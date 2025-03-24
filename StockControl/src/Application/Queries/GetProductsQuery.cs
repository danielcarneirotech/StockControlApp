using MediatR;
using StockControl.Shared.DTOs;

public class GetProductsQuery : IRequest<List<MinimalProduct>> { }