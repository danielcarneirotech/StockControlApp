namespace StockControl.Shared.DTOs
{
    public class StockReportDTO
    {
        public string ProductName { get; set; }
        public string ProductCode { get; set; }
        public int CheckinQuantity { get; set; }
        public int CheckoutQuantity { get; set; }
        public int Balance { get; set; }
    }
}