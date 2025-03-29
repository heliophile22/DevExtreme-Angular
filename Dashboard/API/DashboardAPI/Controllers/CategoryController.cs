using DashboardAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace DashboardAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        public static List<Category> DefaultCategories = new List<Category>
        {
            new Category { ID = 1, Name = "Food", Description = "Expenses related to food items" },
            new Category { ID = 2, Name = "Transportation", Description = "Expenses related to transportation" },
            new Category { ID = 3, Name = "Entertainment", Description = "Expenses related to entertainment activities" },
            new Category { ID = 4, Name = "Utilities", Description = "Expenses related to utility bills" },
            new Category { ID = 5, Name = "Education", Description = "Expenses related to educational purposes" }
        };

        // GET: api/Category
        [HttpGet]
        public ActionResult<IEnumerable<Category>> GetCategory()
        {
            return actualCategories();
        }

        public List<Category> actualCategories()
        {
            //var session = HttpContext.Session.Id;
            var value = HttpContext.Session.GetString("Categories");
            List<Category> list = value == null ? DefaultCategories : JsonConvert.DeserializeObject<List<Category>>(value);
            HttpContext.Session.SetString("Categories", JsonConvert.SerializeObject(list));
            return list;
        }

        // GET: api/Category/5
        [HttpGet("{id}")]
        public ActionResult<Category> GetCategoryById(int id)
        {
            var category = actualCategories().FirstOrDefault(c => c.ID == id);
            if (category == null)
            {
                return NotFound();
            }
            return category;
        }

        // POST: api/Category
        [HttpPost]
        public ActionResult<Category> PostCategory(Category category)
        {
            List<Category> list = actualCategories();
            category.ID = list.Max(c => c.ID) + 1;
            list.Add(category);
            HttpContext.Session.SetString("Categories", JsonConvert.SerializeObject(list));
            return CreatedAtAction(nameof(GetCategoryById), new { id = category.ID }, category);
        }

        // PUT: api/Catgeory/5
        [HttpPut("{id}")]
        public IActionResult Put(Category updatedCategory)
        {
            List<Category> categories = actualCategories();

            var index = categories.FindIndex(c => c.ID == updatedCategory.ID);
            if (index < 0)
                return NotFound();

            categories[index] = updatedCategory;
            HttpContext.Session.SetString("Categories", JsonConvert.SerializeObject(categories));
            return NoContent();
        }

        // DELETE: api/Category/5
        [HttpDelete("{id}")]
        public IActionResult DeleteCategory(int id)
        {
            List<Category> list = actualCategories();

            var index = list.FindIndex(c => c.ID == id);
            if (index < 0)
                return NotFound();
            
            list.RemoveAt(index);
            HttpContext.Session.SetString("Categories", JsonConvert.SerializeObject(list));
            return NoContent();
        }
    }
}