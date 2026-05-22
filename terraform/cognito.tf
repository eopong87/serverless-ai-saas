resource "aws_cognito_user_pool" "users" {
  name = "tf-serverless-ai-saas-users"

  username_attributes = ["email"]

  auto_verified_attributes = ["email"]

  password_policy {
    minimum_length    = 8
    require_lowercase = true
    require_numbers   = true
    require_symbols   = true
    require_uppercase = true
  }

  tags = {
    Project = var.project_name
    Managed = "Terraform"
  }
}

resource "aws_cognito_user_pool_client" "web_client" {
  name         = "tf-serverless-ai-saas-web-client"
  user_pool_id = aws_cognito_user_pool.users.id

  generate_secret = false

  explicit_auth_flows = [
    "ALLOW_USER_PASSWORD_AUTH",
    "ALLOW_USER_SRP_AUTH",
    "ALLOW_REFRESH_TOKEN_AUTH"
  ]
}