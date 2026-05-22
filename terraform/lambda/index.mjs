export const handler = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      success: true,
      message: "Terraform Lambda is working"
    }),
  };
};