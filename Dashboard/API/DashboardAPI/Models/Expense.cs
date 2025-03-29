namespace DashboardAPI.Models
{
    public class Expense
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public decimal Amount { get; set; }
        public DateTime Date { get; set; }
        public int CategoryId { get; set; }
        public int SubCategoryId { get; set; }
    }
}