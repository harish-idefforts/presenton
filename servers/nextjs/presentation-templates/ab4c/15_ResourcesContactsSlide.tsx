import React from 'react';
import { z } from 'zod';
import { RemoteSvgIcon } from '@/app/hooks/useRemoteSvgIcon';

export const layoutId = '15-resources-contacts';
export const layoutName = 'Resources & Contacts';
export const layoutDescription = 'List of references, materials, and contact information. Use near the end to provide follow-up resources.';

// Professional color palette
const professionalColors = {
  background: "#f8f7f4",
  primaryText: "#2d3436",
  secondaryText: "#636e72",
  accent: "#0984e3",
  success: "#00b894",
  warning: "#fdcb6e",
  danger: "#d63031",
  cardBg: "#ffffff",
  borderLight: "#dfe6e9",
};

// Schema for AI content generation
const Schema = z.object({
  contacts: z.array(z.object({
    department: z.string().min(3).max(50).meta({
      description: "Department name. Max 50 characters",
    }),
    name: z.string().min(3).max(50).meta({
      description: "Contact person name. Max 50 characters",
    }),
    email: z.string().email().meta({
      description: "Contact email address",
    }),
    phone: z.string().min(10).max(20).optional().meta({
      description: "Optional phone number",
    }),
  })).min(2).max(6).default([
    { department: 'Compliance', name: 'Sarah Johnson', email: 'sarah.johnson@ab4c.com', phone: '+1 (555) 123-4567' },
    { department: 'Legal', name: 'Michael Chen', email: 'michael.chen@ab4c.com', phone: '+1 (555) 234-5678' },
    { department: 'HR Training', name: 'Emily Davis', email: 'emily.davis@ab4c.com', phone: '+1 (555) 345-6789' },
    { department: 'IT Support', name: 'James Wilson', email: 'james.wilson@ab4c.com', phone: '+1 (555) 456-7890' },
  ]).meta({
    description: "2-6 department contacts",
  }),
  resources: z.array(z.object({
    title: z.string().min(5).max(100).meta({
      description: "Resource title. Max 100 characters",
    }),
    url: z.string().url().meta({
      description: "Resource URL",
    }),
    type: z.enum(['document', 'website', 'tool', 'video', 'training']).meta({
      description: "Resource type",
    }),
  })).min(2).max(6).default([
    { title: 'Compliance Policy Handbook', url: 'https://intranet.ab4c.com/compliance-handbook', type: 'document' },
    { title: 'Online Training Portal', url: 'https://training.ab4c.com', type: 'training' },
    { title: 'Risk Assessment Tool', url: 'https://tools.ab4c.com/risk-assessment', type: 'tool' },
    { title: 'Regulatory Updates', url: 'https://intranet.ab4c.com/regulatory-news', type: 'website' },
  ]).meta({
    description: "2-6 resource links",
  }),
  supportEmail: z.string().email().optional().default('support@ab4c.com').meta({
    description: "General support email",
  }),
  helpdesk: z.string().optional().default('Internal Helpdesk: Ext. 9999').meta({
    description: "Helpdesk contact information",
  }),
});

interface ResourcesContactsSlideProps {
  data?: Partial<ResourcesContactsSlideData>;
}

const ResourcesContactsSlide: React.FC<ResourcesContactsSlideProps> = ({ data: slideData }) => {
  const contacts = slideData?.contacts || [
    { department: 'Compliance', name: 'Sarah Johnson', email: 'sarah.johnson@ab4c.com', phone: '+1 (555) 123-4567' },
    { department: 'Legal', name: 'Michael Chen', email: 'michael.chen@ab4c.com', phone: '+1 (555) 234-5678' },
    { department: 'HR Training', name: 'Emily Davis', email: 'emily.davis@ab4c.com', phone: '+1 (555) 345-6789' },
    { department: 'IT Support', name: 'James Wilson', email: 'james.wilson@ab4c.com', phone: '+1 (555) 456-7890' },
  ];
  const resources = slideData?.resources || [
    { title: 'Compliance Policy Handbook', url: 'https://intranet.ab4c.com/compliance-handbook', type: 'document' },
    { title: 'Online Training Portal', url: 'https://training.ab4c.com', type: 'training' },
    { title: 'Risk Assessment Tool', url: 'https://tools.ab4c.com/risk-assessment', type: 'tool' },
    { title: 'Regulatory Updates', url: 'https://intranet.ab4c.com/regulatory-news', type: 'website' },
  ];
  const supportEmail = slideData?.supportEmail || 'support@ab4c.com';
  const helpdesk = slideData?.helpdesk || 'Internal Helpdesk: Ext. 9999';

  // Get icon for resource type
  const getResourceIcon = (type: string): string => {
    const iconMap: Record<string, string> = {
      document: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/file-text-bold.svg',
      website: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/desktop-bold.svg',
      tool: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/wrench-bold.svg',
      video: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/play-bold.svg',
      training: 'https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/book-bold.svg',
    };
    return iconMap[type] || iconMap.document;
  };

  // Get color for resource type
  const getResourceColor = (type: string): string => {
    const colorMap: Record<string, string> = {
      document: professionalColors.accent,
      website: professionalColors.success,
      tool: professionalColors.warning,
      video: professionalColors.danger,
      training: professionalColors.accent,
    };
    return colorMap[type] || professionalColors.accent;
  };

  return (
    <div className="relative flex flex-col h-screen overflow-hidden" style={{ backgroundColor: professionalColors.background }}>
      {/* Main Content Area */}
      <div className="flex-1 px-16 pt-16 pb-24">
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-xl flex items-center justify-center"
                 style={{ backgroundColor: professionalColors.accent }}>
              <RemoteSvgIcon
                url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/clipboard-bold.svg"
                strokeColor="currentColor"
                className="w-8 h-8"
                color="#ffffff"
                title="Resources"
              />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-wider"
                 style={{ color: professionalColors.accent }}>
                REFERENCE MATERIALS
              </p>
              <h1 className="text-4xl font-bold" style={{ color: professionalColors.primaryText }}>
                Resources & Contacts
              </h1>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Department Contacts */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <RemoteSvgIcon
                url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/users-bold.svg"
                strokeColor="currentColor"
                className="w-6 h-6"
                color={professionalColors.primaryText}
                title="Contacts"
              />
              <h2 className="text-2xl font-bold" style={{ color: professionalColors.primaryText }}>
                Department Contacts
              </h2>
            </div>

            <div className="space-y-4">
              {contacts.map((contact, index) => (
                <div
                  key={index}
                  className="p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow"
                  style={{ backgroundColor: professionalColors.cardBg }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded"
                              style={{
                                backgroundColor: professionalColors.accent + '15',
                                color: professionalColors.accent
                              }}>
                          {contact.department}
                        </span>
                      </div>
                      <p className="text-lg font-semibold mb-2" style={{ color: professionalColors.primaryText }}>
                        {contact.name}
                      </p>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <RemoteSvgIcon
                            url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chat-bold.svg"
                            strokeColor="currentColor"
                            className="w-4 h-4"
                            color={professionalColors.secondaryText}
                            title="Email"
                          />
                          <a href={`mailto:${contact.email}`}
                             className="text-sm hover:underline"
                             style={{ color: professionalColors.accent }}>
                            {contact.email}
                          </a>
                        </div>
                        {contact.phone && (
                          <div className="flex items-center gap-2">
                            <RemoteSvgIcon
                              url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/megaphone-bold.svg"
                              strokeColor="currentColor"
                              className="w-4 h-4"
                              color={professionalColors.secondaryText}
                              title="Phone"
                            />
                            <span className="text-sm" style={{ color: professionalColors.secondaryText }}>
                              {contact.phone}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center"
                         style={{ backgroundColor: professionalColors.accent + '15' }}>
                      <RemoteSvgIcon
                        url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/user-bold.svg"
                        strokeColor="currentColor"
                        className="w-6 h-6"
                        color={professionalColors.accent}
                        title="Contact"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Resources */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <RemoteSvgIcon
                url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/bookmark-bold.svg"
                strokeColor="currentColor"
                className="w-6 h-6"
                color={professionalColors.primaryText}
                title="Resources"
              />
              <h2 className="text-2xl font-bold" style={{ color: professionalColors.primaryText }}>
                Available Resources
              </h2>
            </div>

            <div className="space-y-4">
              {resources.map((resource, index) => (
                <div
                  key={index}
                  className="p-5 rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer"
                  style={{ backgroundColor: professionalColors.cardBg }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                         style={{ backgroundColor: getResourceColor(resource.type) + '15' }}>
                      <RemoteSvgIcon
                        url={getResourceIcon(resource.type)}
                        strokeColor="currentColor"
                        className="w-6 h-6"
                        color={getResourceColor(resource.type)}
                        title={resource.type}
                      />
                    </div>
                    <div className="flex-1">
                      <p className="text-base font-semibold mb-1" style={{ color: professionalColors.primaryText }}>
                        {resource.title}
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-medium uppercase px-2 py-0.5 rounded"
                              style={{
                                backgroundColor: getResourceColor(resource.type) + '20',
                                color: getResourceColor(resource.type)
                              }}>
                          {resource.type}
                        </span>
                        <a href={resource.url}
                           className="text-xs hover:underline truncate flex-1"
                           style={{ color: professionalColors.accent }}
                           target="_blank"
                           rel="noopener noreferrer">
                          {resource.url}
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Support Information Bar */}
        <div className="mt-10 p-6 rounded-xl"
             style={{ backgroundColor: professionalColors.success + '15' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <RemoteSvgIcon
                url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/heart-bold.svg"
                strokeColor="currentColor"
                className="w-6 h-6"
                color={professionalColors.success}
                title="Support"
              />
              <div>
                <p className="text-sm font-bold" style={{ color: professionalColors.primaryText }}>
                  Need Additional Help?
                </p>
                <p className="text-sm" style={{ color: professionalColors.secondaryText }}>
                  Our support team is ready to assist you with any questions
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              {supportEmail && (
                <div className="flex items-center gap-2">
                  <RemoteSvgIcon
                    url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/chat-bold.svg"
                    strokeColor="currentColor"
                    className="w-5 h-5"
                    color={professionalColors.success}
                    title="Email Support"
                  />
                  <a href={`mailto:${supportEmail}`}
                     className="text-sm font-medium hover:underline"
                     style={{ color: professionalColors.accent }}>
                    {supportEmail}
                  </a>
                </div>
              )}
              {helpdesk && (
                <div className="flex items-center gap-2">
                  <RemoteSvgIcon
                    url="https://presenton-public.s3.ap-southeast-1.amazonaws.com/static/icons/bold/megaphone-bold.svg"
                    strokeColor="currentColor"
                    className="w-5 h-5"
                    color={professionalColors.success}
                    title="Helpdesk"
                  />
                  <span className="text-sm font-medium" style={{ color: professionalColors.primaryText }}>
                    {helpdesk}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 h-20 z-20 flex items-center justify-between px-8"
           style={{ backgroundColor: professionalColors.background }}>
        <span className="text-xs" style={{ color: professionalColors.secondaryText }}>
          Do not share without permission
        </span>
        <span className="text-xs" style={{ color: professionalColors.secondaryText }}>
          © 2025 AB4C Compliance & Customer Relations. All rights reserved.
        </span>
        <img src="/ab4c-logo.png" alt="AB4C Logo" className="h-14 w-14 object-contain" />
      </div>
    </div>
  );
};

export { Schema };
export type ResourcesContactsSlideData = z.infer<typeof Schema>;

export default ResourcesContactsSlide;