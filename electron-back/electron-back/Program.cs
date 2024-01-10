using electron_back;
using StreamJsonRpc;

var builder = WebApplication.CreateBuilder(new WebApplicationOptions
{
    ContentRootPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "static"),
    WebRootPath = "app"
});

var app = builder.Build();
app.UseStaticFiles();
app.UseWebSockets();

app.Use(async (context, next) =>
{
    if (context.Request.Path == "/rpc")
    {
        if (context.WebSockets.IsWebSocketRequest)
        {
            using var connection = await context.WebSockets.AcceptWebSocketAsync();
            using var messageHandler = new WebSocketMessageHandler(connection);
            using var jsonRpc = new JsonRpc(messageHandler, new RPCServer());
            jsonRpc.StartListening();
            await jsonRpc.Completion;
        }

        throw new Exception("123 321");
    }
    else
    {
        await next(context);
    }
});

await app.RunAsync();
