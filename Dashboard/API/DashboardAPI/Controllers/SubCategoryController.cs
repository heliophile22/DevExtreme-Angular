using DashboardAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace DashboardAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubCategoryController : ControllerBase
    {
        public static List<SubCategory> DefaultSubCategories = new List<SubCategory>
        {
            new SubCategory { ID = 1, Name = "Groceries", Description = "Expenses on grocery items", CategoryId = 1 },
            new SubCategory { ID = 2, Name = "Restaurants", Description = "Expenses on dining out", CategoryId = 1 },
            new SubCategory { ID = 3, Name = "Fuel", Description = "Expenses on fuel for vehicles", CategoryId = 2 },
            new SubCategory { ID = 4, Name = "Public Transport", Description = "Expenses on public transportation", CategoryId = 2 },
            new SubCategory { ID = 5, Name = "Movies", Description = "Expenses on movie tickets", CategoryId = 3 },
            new SubCategory { ID = 6, Name = "Concerts", Description = "Expenses on concert tickets", CategoryId = 3 },
            new SubCategory { ID = 7, Name = "Electricity", Description = "Expenses on electricity bills", CategoryId = 4 },
            new SubCategory { ID = 8, Name = "Water", Description = "Expenses on water bills", CategoryId = 4 },
            new SubCategory { ID = 9, Name = "Books", Description = "Expenses on books and study materials", CategoryId = 5 },
            new SubCategory { ID = 10, Name = "Tuition", Description = "Expenses on tuition fees", CategoryId = 5 }
        };

        [HttpGet]
        public ActionResult<IEnumerable<SubCategory>> GetSubCategory()
        {
            return actualSubCategories();
        }

        public List<SubCategory> actualSubCategories()
        {
            var value = HttpContext.Session.GetString("SubCategories");
            List<SubCategory> list = value == null ? DefaultSubCategories : JsonConvert.DeserializeObject<List<SubCategory>>(value);
            HttpContext.Session.SetString("SubCategories", JsonConvert.SerializeObject(list));
            return list;
        }

        [HttpGet("{id}")]
        public ActionResult<SubCategory> GetSubCategoryById(int id)
        {
            var subCategory = actualSubCategories().FirstOrDefault(c => c.ID == id);
            if (subCategory == null)
            {
                return NotFound();
            }
            return subCategory;
        }
        
        [HttpPost]
        public ActionResult<SubCategory> PostSubCategory(SubCategory subCategory)
        {
            List<SubCategory> list = actualSubCategories();
            subCategory.ID = list.Max(c => c.ID) + 1;
            list.Add(subCategory);
            HttpContext.Session.SetString("SubCategories", JsonConvert.SerializeObject(list));
            return CreatedAtAction(nameof(GetSubCategoryById), new { id = subCategory.ID }, subCategory);
        }

        [HttpPut("{id}")]
        public IActionResult PutSubCategory(SubCategory updatedSubCategory)
        {
            List<SubCategory> subCategories = actualSubCategories();

            var index = subCategories.FindIndex(c => c.ID == updatedSubCategory.ID);
            if (index < 0)
                return NotFound();

            subCategories[index] = updatedSubCategory;
            HttpContext.Session.SetString("SubCategories", JsonConvert.SerializeObject(subCategories));
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteSubCategory(int id)
        {
            List<SubCategory> list = actualSubCategories();
            
            var index = list.FindIndex(c => c.ID == id);
            if (index < 0)
                return NotFound();

            list.RemoveAt(index);
            HttpContext.Session.SetString("SubCategories", JsonConvert.SerializeObject(list));
            return NoContent();
        }

        [HttpGet("ByCategory/{categoryId}")]
        public ActionResult<IEnumerable<SubCategory>> GetSubCategoriesByCategoryId(int categoryId)
        {
            var _subCategories = actualSubCategories().Where(sc => sc.CategoryId == categoryId).ToList();
            if (_subCategories == null || !_subCategories.Any())
            {
                return NotFound("Subcategories not found for the given category.");
            }

            return Ok(_subCategories);
        }
    }
}