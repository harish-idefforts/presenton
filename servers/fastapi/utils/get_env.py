import os


def get_can_change_keys_env():
    return os.getenv("CAN_CHANGE_KEYS")


def get_database_url_env():
    return os.getenv("DATABASE_URL")


def get_app_data_directory_env():
    return os.getenv("APP_DATA_DIRECTORY")


def get_temp_directory_env():
    return os.getenv("TEMP_DIRECTORY")


def get_user_config_path_env():
    return os.getenv("USER_CONFIG_PATH")


def get_llm_provider_env():
    return os.getenv("LLM")


def get_anthropic_api_key_env():
    return os.getenv("ANTHROPIC_API_KEY")


def get_anthropic_model_env():
    return os.getenv("ANTHROPIC_MODEL")


def get_ollama_url_env():
    return os.getenv("OLLAMA_URL")


def get_custom_llm_url_env():
    return os.getenv("CUSTOM_LLM_URL")


def get_openai_api_key_env():
    return os.getenv("OPENAI_API_KEY")


def get_openai_model_env():
    return os.getenv("OPENAI_MODEL")


def get_google_api_key_env():
    return os.getenv("GOOGLE_API_KEY")


def get_google_model_env():
    return os.getenv("GOOGLE_MODEL")


def get_custom_llm_api_key_env():
    return os.getenv("CUSTOM_LLM_API_KEY")


def get_ollama_model_env():
    return os.getenv("OLLAMA_MODEL")


def get_custom_model_env():
    return os.getenv("CUSTOM_MODEL")


def get_pexels_api_key_env():
    return os.getenv("PEXELS_API_KEY")


def get_image_provider_env():
    return os.getenv("IMAGE_PROVIDER")


def get_pixabay_api_key_env():
    return os.getenv("PIXABAY_API_KEY")


def get_tool_calls_env():
    return os.getenv("TOOL_CALLS")


def get_disable_thinking_env():
    return os.getenv("DISABLE_THINKING")


def get_extended_reasoning_env():
    return os.getenv("EXTENDED_REASONING")


def get_web_grounding_env():
    return os.getenv("WEB_GROUNDING")


# SharePoint environment variables
def get_sharepoint_tenant_id_env():
    return os.getenv("SHAREPOINT_TENANT_ID")


def get_sharepoint_client_id_env():
    return os.getenv("SHAREPOINT_CLIENT_ID")


def get_sharepoint_client_secret_env():
    return os.getenv("SHAREPOINT_CLIENT_SECRET")


def get_sharepoint_site_id_env():
    return os.getenv(
        "SHAREPOINT_SITE_ID",
        "ab4ccompliancecustomerrelat.sharepoint.com,28a95b2b-b80f-48f1-9091-df6496238e4e,60fd3796-be58-4c42-b56c-f8bc49f12a8c",
    )


def get_sharepoint_drive_id_env():
    return os.getenv(
        "SHAREPOINT_DRIVE_ID",
        "b!K1upKA-48UiQkd9kliOOTpY3_WBYvkJMtWz4vEnxKox582fHmgeZT40Plq2iqMSN",
    )
