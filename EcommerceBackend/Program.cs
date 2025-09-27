using EcommerceBackend.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add Entity Framework with In-Memory Database
builder.Services.AddDbContext<EcommerceContext>(options =>
    options.UseInMemoryDatabase("EcommerceDb"));

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy =>
        {
            policy.AllowAnyOrigin()
                  .AllowAnyMethod()
                  .AllowAnyHeader();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");
app.UseAuthorization();
app.MapControllers();

// Seed data
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<EcommerceContext>();
    SeedData(context);
}

// Configure to run on port 3001
app.Urls.Add("http://localhost:3001");

app.Run();

static void SeedData(EcommerceContext context)
{
    if (!context.Categories.Any())
    {
        context.Categories.AddRange(
            new Category { Id = 1, Name = "Shirts", Description = "T-shirts, dress shirts, and casual shirts" },
            new Category { Id = 2, Name = "Bottoms", Description = "Jeans, pants, shorts, and skirts" },
            new Category { Id = 3, Name = "Outerwear", Description = "Jackets, coats, and sweaters" }
        );
    }

    if (!context.Products.Any())
    {
        context.Products.AddRange(
            new Product { Id = 1, Name = "Classic Cotton T-Shirt", Description = "Comfortable cotton t-shirt in various colors", Price = 24.99m, CategoryId = 1, Stock = 150, ImageUrl = "https://via.placeholder.com/300x300?text=Cotton+T-Shirt" },
            new Product { Id = 2, Name = "Formal Dress Shirt", Description = "Professional white dress shirt", Price = 59.99m, CategoryId = 1, Stock = 80, ImageUrl = "https://via.placeholder.com/300x300?text=Dress+Shirt" },
            new Product { Id = 3, Name = "Slim Fit Jeans", Description = "Dark blue slim fit denim jeans", Price = 89.99m, CategoryId = 2, Stock = 120, ImageUrl = "https://via.placeholder.com/300x300?text=Slim+Jeans" },
            new Product { Id = 4, Name = "Casual Chino Pants", Description = "Khaki colored casual chino pants", Price = 69.99m, CategoryId = 2, Stock = 95, ImageUrl = "https://via.placeholder.com/300x300?text=Chino+Pants" },
            new Product { Id = 5, Name = "Winter Hoodie", Description = "Warm fleece hoodie with front pocket", Price = 79.99m, CategoryId = 3, Stock = 60, ImageUrl = "https://via.placeholder.com/300x300?text=Hoodie" },
            new Product { Id = 6, Name = "Denim Jacket", Description = "Classic blue denim jacket", Price = 99.99m, CategoryId = 3, Stock = 45, ImageUrl = "https://via.placeholder.com/300x300?text=Denim+Jacket" },
            new Product { Id = 7, Name = "Polo Shirt", Description = "Classic polo shirt in navy blue", Price = 39.99m, CategoryId = 1, Stock = 110, ImageUrl = "https://via.placeholder.com/300x300?text=Polo+Shirt" },
            new Product { Id = 8, Name = "Cargo Shorts", Description = "Comfortable cargo shorts with multiple pockets", Price = 49.99m, CategoryId = 2, Stock = 85, ImageUrl = "https://via.placeholder.com/300x300?text=Cargo+Shorts" }
        );
    }

    context.SaveChanges();
}