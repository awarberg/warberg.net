using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace Api
{
    class Program
    {
        readonly static string _storageConnectionString = Environment.GetEnvironmentVariable("AzureWebJobsStorage") ?? string.Empty;

        static Task Main(string[] args)
        {
            var host = new HostBuilder()
                .ConfigureAppConfiguration(configurationBuilder =>
                {
                    configurationBuilder.AddCommandLine(args);
                })
                .ConfigureFunctionsWorkerDefaults()
                .ConfigureServices(services =>
                {
                    // Add Logging
                    services.AddLogging();

                    // Add HttpClient
                    services.AddHttpClient();
                })
                .Build();

            return host.RunAsync();
        }
    }
}