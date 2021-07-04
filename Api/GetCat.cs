using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using Microsoft.Azure.Functions.Worker.Http;
using Microsoft.Azure.Functions.Worker;

namespace Api
{
    public static class GetCat
    {
        public const string FunctionName = "GetCat";
        readonly static string _clientId = Environment.GetEnvironmentVariable("GitTrendsClientId") ?? string.Empty;

        [Function(FunctionName)]
        public static async Task<HttpResponseData> Run([HttpTrigger(AuthorizationLevel.Anonymous, "get")] HttpRequestData req, FunctionContext context)
        {
            var logger = context.GetLogger(FunctionName);
            logger.LogInformation("Retrieving Client Id");

            if (string.IsNullOrWhiteSpace(_clientId))
            {
                var notFoundResponse = req.CreateResponse(System.Net.HttpStatusCode.NotFound);
                await notFoundResponse.WriteStringAsync("Client ID Not Found").ConfigureAwait(false);

                return notFoundResponse;
            }

            var okResponse = req.CreateResponse(System.Net.HttpStatusCode.OK);
            await okResponse.WriteAsJsonAsync(new { name = "Mio" });

            return okResponse;
        }
    }
}
