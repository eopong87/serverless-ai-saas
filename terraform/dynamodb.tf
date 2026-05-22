resource "aws_dynamodb_table" "prompt_history" {
  name         = "tf_ai_prompt_history"
  billing_mode = "PAY_PER_REQUEST"

  hash_key  = "userId"
  range_key = "createdAt"

  attribute {
    name = "userId"
    type = "S"
  }

  attribute {
    name = "createdAt"
    type = "S"
  }

  tags = {
    Project = var.project_name
    Managed = "Terraform"
  }
}