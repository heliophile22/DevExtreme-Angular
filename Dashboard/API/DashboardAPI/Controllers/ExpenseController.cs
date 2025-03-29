using DashboardAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace DashboardAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExpenseController : ControllerBase
    {
        public static List<Expense> DefaultExpenses = new List<Expense>
        {
            new Expense { ID = 1, Name = "Grocery Shopping", Amount = 100.50m, Date = DateTime.Parse("2024-03-25"), CategoryId = 1, SubCategoryId = 1 },
            new Expense { ID = 2, Name = "Dinner at Italian Restaurant", Amount = 45.75m, Date = DateTime.Parse("2024-03-26"), CategoryId = 1, SubCategoryId = 2 },
            new Expense { ID = 3, Name = "Fuel for Car", Amount = 60.20m, Date = DateTime.Parse("2024-03-27"), CategoryId = 2, SubCategoryId = 3 },
            new Expense { ID = 4, Name = "Bus Fare", Amount = 10.00m, Date = DateTime.Parse("2024-03-25"), CategoryId = 2, SubCategoryId = 4 },
            new Expense { ID = 5, Name = "Movie Tickets", Amount = 25.00m, Date = DateTime.Parse("2024-03-26"), CategoryId = 3, SubCategoryId = 5 },
            new Expense { ID = 6, Name = "Electricity Bill", Amount = 80.50m, Date = DateTime.Parse("2024-03-27"), CategoryId = 4, SubCategoryId = 7 },
            new Expense { ID = 7, Name = "Textbooks Purchase", Amount = 120.00m, Date = DateTime.Parse("2024-03-25"), CategoryId = 5, SubCategoryId = 9 },
            new Expense { ID = 8, Name = "Maths Tuition Fees", Amount = 200.00m, Date = DateTime.Parse("2024-03-26"), CategoryId = 5, SubCategoryId = 10 }
        };

        [HttpGet]
        public ActionResult<IEnumerable<Expense>> GetExpense()
        {
            return actualExpenses();
        }

        public List<Expense> actualExpenses()
        {
            var value = HttpContext.Session.GetString("Expenses");
            List<Expense> list = value == null ? DefaultExpenses : JsonConvert.DeserializeObject<List<Expense>>(value);
            HttpContext.Session.SetString("Expenses", JsonConvert.SerializeObject(list));
            return list;
        }

        [HttpGet("{id}")]
        public ActionResult<Expense> GetExpenseById(int id)
        {
            var expense = actualExpenses().FirstOrDefault(c => c.ID == id);
            if (expense == null)
            {
                return NotFound();
            }
            return expense;
        }

        [HttpPost]
        public ActionResult<Expense> PostExpense(Expense expense)
        {
            List<Expense> list = actualExpenses();
            expense.ID = list.Max(c => c.ID) + 1;
            list.Add(expense);
            HttpContext.Session.SetString("Expenses", JsonConvert.SerializeObject(list));
            return CreatedAtAction(nameof(GetExpenseById), new { id = expense.ID }, expense);
        }

        [HttpPut("{id}")]
        public IActionResult PutExpense(Expense updatedExpense)
        {
            List<Expense> expenses = actualExpenses();

            var index = expenses.FindIndex(c => c.ID == updatedExpense.ID);
            if (index < 0)
                return NotFound();

            expenses[index] = updatedExpense;
            HttpContext.Session.SetString("Expenses", JsonConvert.SerializeObject(expenses));
            return NoContent();
        }
        
        [HttpDelete("{id}")]
        public IActionResult DeleteExpense(int id)
        {
            List<Expense> expenses = actualExpenses();
            var index = expenses.FindIndex(c => c.ID == id);
            if (index < 0)
                return NotFound();

            expenses.RemoveAt(index);
            HttpContext.Session.SetString("Expenses", JsonConvert.SerializeObject(expenses));
            return NoContent();
        }
    }
}