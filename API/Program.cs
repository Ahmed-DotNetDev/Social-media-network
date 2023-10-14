using API.Extensions;
using API.Middleware;
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityService(builder.Configuration);

var app = builder.Build();


// Configure the HTTP request pipeline.
app.UseMiddleware<ExceptionMiddleware>();

app.UseHttpsRedirection();
app.UseCors(builder => builder.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:4200"));
app.UseAuthorization();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
