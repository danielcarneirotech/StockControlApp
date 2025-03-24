namespace StockControl.Shared.DTOs
{
    public class ProductDTO
    {
        public string Name { get; set; }
        public string Code { get; set; }
        public ICollection<TransactionDTO> Transactions { get; set; } = [];
    }
}