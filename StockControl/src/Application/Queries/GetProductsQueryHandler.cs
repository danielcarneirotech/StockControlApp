using MediatR;
using StockControl.Shared.DTOs;
using StockControl.Domain.Interfaces;

namespace StockControl.Application.Queries
{
    public class GetProductsQueryHandler : IRequestHandler<GetProductsQuery, List<MinimalProduct>>
    {
        private readonly IProductRepository _productRepository;

        public GetProductsQueryHandler(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<List<MinimalProduct>> Handle(GetProductsQuery request, CancellationToken cancellationToken)
        {
            return await _productRepository.GetAll();
        }
    }
}