using SistemaOdontologico.Models;
using Microsoft.EntityFrameworkCore.SqlServer;
using Microsoft.EntityFrameworkCore;

//using SistemaOdontologico.Utilidades;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<SistemaOdontologicoDbContext>(options =>
{
  options.UseSqlServer(builder.Configuration.GetConnectionString("sqlConection"));
});


builder.Services.AddCors(options => {
  options.AddPolicy("NuevaPolitica", app =>
  {

    app.AllowAnyOrigin()
    .AllowAnyHeader()
    .AllowAnyMethod();

  });



}



  );

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var app = builder.Build();


app.UseCors("NuevaPolitica");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
  
}


app.MapControllerRoute(
    name: "default",
    pattern: "{controller}/{action=Index}/{id?}");



app.UseAuthorization();

app.MapControllers(



  );

app.Run();


