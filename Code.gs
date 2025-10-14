// Code.gs — Final Version with Api2Pdf Integration
// --------------------------------------------------------

// ----- CONFIGURATION -----
const LOG_SPREADSHEET_ID = "1pCis1fL2eMUtExXnRl3JOwy-vimyesBZ4y85cMhsEu4"; // <-- your sheet ID
const PROCESSED_LABEL_NAME = "savedEmails";
const TRIGGER_HANDLER_FUNCTION = "executeTriggeredTask";
const API2PDF_KEY = "09c97b50-bdfc-4549-9753-aed9024efd85";

// ----- WEB APP ENTRY -----
function doGet() {
  return HtmlService.createHtmlOutputFromFile('Index')
    .setTitle('Save Emails and Attachments');
}

// ----- WORKFLOW & TRIGGER MANAGEMENT -----
function saveNewWorkflow(settings) {
  try {
    const { labelName, folderId, workflowName, format, interval } = settings;
    if (!labelName || !folderId || !workflowName || !format || !interval) {
      return { success: false, message: "Error: All settings are required." };
    }
    const triggerBuilder = ScriptApp.newTrigger(TRIGGER_HANDLER_FUNCTION).timeBased();
    switch (interval) {
      case 'daily': triggerBuilder.everyDays(1).atHour(1).create(); break;
      case 'every6hours': triggerBuilder.everyHours(6).create(); break;
      case 'everyhour': triggerBuilder.everyHours(1).create(); break;
      case 'weekly': triggerBuilder.onWeekDay(ScriptApp.WeekDay.MONDAY).atHour(1).create(); break;
      case 'everyminute': triggerBuilder.everyMinutes(1).create(); break;
      default: return { success: false, message: "Error: Invalid interval." };
    }
    const triggerId = ScriptApp.getProjectTriggers().pop().getUniqueId();
    PropertiesService.getUserProperties().setProperty(triggerId, JSON.stringify(settings));
    return { success: true, message: `Success! New workflow for label "${labelName}" was scheduled.` };
  } catch (e) {
    console.error("Error in saveNewWorkflow: " + e.toString());
    return { success: false, message: "An error occurred: " + e.message };
  }
}

function executeTriggeredTask(e) {
  const triggerId = e.triggerUid;
  const settingsString = PropertiesService.getUserProperties().getProperty(triggerId);
  if (!settingsString) {
    console.error(`A trigger (${triggerId}) ran but could not find its settings.`);
    return;
  }
  const settings = JSON.parse(settingsString);
  console.log(`Executing triggered workflow for label: ${settings.labelName}`);
  processEmails(settings.labelName, settings.folderId, settings.workflowName, settings.format);
}

function deleteWorkflow(triggerId) {
  try {
    ScriptApp.getProjectTriggers().forEach(trigger => {
      if (trigger.getUniqueId() === triggerId) {
        ScriptApp.deleteTrigger(trigger);
      }
    });
    PropertiesService.getUserProperties().deleteProperty(triggerId);
    return { success: true, message: "Workflow deleted successfully." };
  } catch (e) {
    console.error("Error in deleteWorkflow: " + e.toString());
    return { success: false, message: "An error occurred while deleting the workflow." };
  }
}

function getSavedWorkflows() {
  try {
    const triggers = ScriptApp.getProjectTriggers();
    const properties = PropertiesService.getUserProperties().getProperties();
    const workflows = [];
    triggers.forEach(trigger => {
      if (trigger.getHandlerFunction() === TRIGGER_HANDLER_FUNCTION) {
        const triggerId = trigger.getUniqueId();
        const settingsString = properties[triggerId];
        if (settingsString) {
          const settings = JSON.parse(settingsString);
          workflows.push({
            triggerId: triggerId,
            labelName: settings.labelName,
            folderPath: getFolderPath(DriveApp.getFolderById(settings.folderId)),
            workflowName: settings.workflowName,
            format: settings.format,
            interval: settings.interval
          });
        }
      }
    });
    return workflows;
  } catch(e) {
    return [];
  }
}

// ----- UI HELPERS & DRIVE BROWSER -----
function getGmailLabels() { try { return GmailApp.getUserLabels().map(l => l.getName()).filter(n => n !== PROCESSED_LABEL_NAME); } catch (e) { return []; } }
function getWorkflowTabs() { try { return SpreadsheetApp.openById(LOG_SPREADSHEET_ID).getSheets().map(s => s.getName()).filter(n => n.toLowerCase() !== 'master'); } catch (e) { return ["Error: " + e.message]; } }
function getTopLevelFolders() { const f=[], F=DriveApp.getRootFolder().getFolders(); while(F.hasNext()){let o=F.next();f.push({name:o.getName(),id:o.getId()})} return f; }
function getSubFolders(folderId) { if (!folderId || folderId === "root") return { folders: getTopLevelFolders(), breadcrumb: [{ name: "My Drive", id: "root" }], fullPath: "My Drive" }; const pF = DriveApp.getFolderById(folderId), f=[], F=pF.getFolders(); while(F.hasNext()){let o=F.next();f.push({name:o.getName(),id:o.getId()})} const b=[]; let c=pF; while(c.getParents().hasNext()){b.unshift({name:c.getName(),id:c.getId()});c=c.getParents().next();if(c.getId()===DriveApp.getRootFolder().getId())break} b.unshift({name:"My Drive",id:"root"}); return { folders: f, breadcrumb: b, fullPath: getFolderPath(pF) }; }
function getFolderPath(folder) { if (!folder) return ""; let p=[folder.getName()], c=folder; while(c.getParents().hasNext()){c=c.getParents().next();if(c.getId()===DriveApp.getRootFolder().getId())break;p.unshift(c.getName())} p.unshift("My Drive"); return p.join(' > '); }
function escapeHtml(unsafe) { return String(unsafe).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"); }

// ----- INLINE IMAGE (CID) FIX -----
function inlineCidImages(html, messageId) {
  try {
    const msg = Gmail.Users.Messages.get('me', messageId);
    if (!msg.payload || !msg.payload.parts) return html;
    const cidMap = {};
    msg.payload.parts.forEach(part => {
      if (part.body && part.body.attachmentId && part.headers) {
        const contentIdHeader = part.headers.find(h => h.name.toLowerCase() === 'content-id');
        if (contentIdHeader) {
          const cid = contentIdHeader.value.replace(/[<>]/g, '');
          const attachment = Gmail.Users.Messages.Attachments.get('me', messageId, part.body.attachmentId);
          cidMap[cid] = `data:${part.mimeType};base64,${attachment.data.replace(/-/g, '+').replace(/_/g, '/')}`;
        }
      }
    });
    if (Object.keys(cidMap).length === 0) return html;
    return html.replace(/(\bsrc\s*=\s*["'])\s*cid:\s*([^"'>\s]+)\s*(["'])/gi, (match, open, cid, close) => cidMap[cid] ? `${open}${cidMap[cid]}${close}` : match);
  } catch (e) {
    console.error("Error in inlineCidImages: " + e.toString());
    return html;
  }
}

// ----- MAIN PROCESSING -----
function processEmails(labelName, folderId, workflowName, format) {
  if (!labelName || !folderId || !workflowName || !format) return "Error: All settings are required.";
  const spreadsheet = SpreadsheetApp.openById(LOG_SPREADSHEET_ID);
  try {
    const savedLabel = GmailApp.getUserLabelByName(PROCESSED_LABEL_NAME) || GmailApp.createLabel(PROCESSED_LABEL_NAME);
    let logSheet = spreadsheet.getSheetByName(workflowName);
    if (!logSheet) return `Error: The workflow tab "${workflowName}" was not found.`;
    const destinationFolder = DriveApp.getFolderById(folderId);
    const folderUrl = destinationFolder.getUrl();
    const folderPathHyperlink = `=HYPERLINK("${folderUrl}", "${getFolderPath(destinationFolder).replace(/"/g, '""')}")`;
    const threads = GmailApp.search(`label:${labelName} -label:${PROCESSED_LABEL_NAME}`);
    if (threads.length === 0) return `No new emails to process in the label "${labelName}".`;
    let emailCount = 0, attachmentCount = 0;
    const invalidChars = /[\\/:"*?<>|]/g;
    threads.forEach(thread => {
      thread.getMessages().forEach(message => {
        const msgDate = message.getDate(), msgSubject = message.getSubject(), msgSender = message.getFrom(), msgId = message.getId();
        let senderName = msgSender.split('<')[0].trim().replace(/"/g, '') || msgSender.split('@')[0];
        const safeSenderName = senderName.replace(invalidChars, '-');
        const datePart1 = Utilities.formatDate(msgDate, "UTC", "yyyy-MM-dd"), timePart = Utilities.formatDate(msgDate, "UTC", "HHmm"), datePart2 = Utilities.formatDate(msgDate, "UTC", "dd MMMM yyyy");
        let emailFile, emailFileName;

        // ===== START OF THE CORRECTED LOGIC BLOCK =====
        if (format === 'pdf') {
          emailFileName = `${datePart1} - (${timePart}) - E-Mail from ${safeSenderName} - ${datePart2}.pdf`;
          
          let htmlBody = message.getBody();
          htmlBody = inlineCidImages(htmlBody, msgId);
          const finalHtmlContent = `<style>body{font-family:sans-serif;}</style><h3>${escapeHtml(msgSubject)}</h3><p><strong>From:</strong> ${escapeHtml(msgSender)}</p><p><strong>Date:</strong> ${msgDate.toUTCString()}</p><hr>${htmlBody}`;

          const apiPayload = { html: finalHtmlContent, inlinePdf: false }; // We want the URL
          const apiOptions = { method: 'post', contentType: 'application/json', headers: { 'Authorization': API2PDF_KEY }, payload: JSON.stringify(apiPayload) };
          
          // Step 1: Call API to get the JSON response with the URL
          const apiResponse = UrlFetchApp.fetch('https://v2018.api2pdf.com/chrome/html', apiOptions);
          const responseData = JSON.parse(apiResponse.getContentText());

          if (!responseData.success) {
            throw new Error("Api2Pdf failed: " + responseData.error);
          }
          
          const pdfUrl = responseData.pdf; // This is the URL to the actual PDF
          
          // Step 2: Fetch the actual PDF from the URL
          const pdfBlob = UrlFetchApp.fetch(pdfUrl).getBlob().setName(emailFileName);
          
          emailFile = destinationFolder.createFile(pdfBlob);

        } else { // 'eml'
          emailFileName = `${datePart1} - (${timePart}) - E-Mail from ${safeSenderName} - ${datePart2}.eml`;
          emailFile = destinationFolder.createFile(emailFileName, message.getRawContent(), MimeType.PLAIN_TEXT);
        }
        // ===== END OF THE CORRECTED LOGIC BLOCK =====

        emailCount++;
        logSheet.appendRow([new Date(), msgDate, msgSender, `=HYPERLINK("${thread.getPermalink()}", "${(message.getAttachments({includeInlineImages:false}).length>0?`${msgSubject} # 1`:msgSubject).replace(/"/g, '""')}")`, `=HYPERLINK("${emailFile.getUrl()}", "${emailFileName}")`, folderPathHyperlink]);
        
        message.getAttachments({ includeInlineImages: false }).forEach((attachment, i) => {
          const originalName = attachment.getName(), dotIndex = originalName.lastIndexOf('.'), baseName = dotIndex!==-1?originalName.substring(0,dotIndex):originalName, ext = dotIndex!==-1?originalName.substring(dotIndex):'';
          const attachmentFileName = `${datePart1} - (${timePart}) - Z - ${baseName.replace(invalidChars, '-')} - ${datePart2}${ext}`;
          const attachmentFile = destinationFolder.createFile(attachment.copyBlob()).setName(attachmentFileName);
          attachmentCount++;
          logSheet.appendRow([new Date(), msgDate, msgSender, `=HYPERLINK("${thread.getPermalink()}", "${`${msgSubject} # ${i+2}`.replace(/"/g, '""')}")`, `=HYPERLINK("${attachmentFile.getUrl()}", "${attachmentFileName}")`, folderPathHyperlink]);
        });
      });
      thread.addLabel(savedLabel);
    });
    return `Success! Processed ${emailCount} emails and ${attachmentCount} attachments.`;
  } catch (e) {
    console.error("Conversion Error: " + e.toString() + " Stack: " + e.stack);
    return `An error occurred: ${e.message}`;
  }
}