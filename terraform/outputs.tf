output "dynamodb_table_name" {
  value = aws_dynamodb_table.prompt_history.name
}

output "lambda_function_name" {
  value = aws_lambda_function.ai_handler.function_name
}

output "api_gateway_url" {
  value = aws_apigatewayv2_api.http_api.api_endpoint
}
output "cognito_user_pool_id" {
  value = aws_cognito_user_pool.users.id
}

output "cognito_web_client_id" {
  value = aws_cognito_user_pool_client.web_client.id
}