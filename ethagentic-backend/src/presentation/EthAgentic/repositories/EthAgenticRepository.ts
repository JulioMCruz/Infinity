import { IEthAgenticRepository, Sale, Insight } from "@Domain/adapters/eth.types";

export class EthAgenticRepository implements IEthAgenticRepository {
  async getSales(): Promise<Sale[]> {
    // Mock data
    return [
      {
        id: '1',
        amount: 1500,
        date: '2024-02-01',
        product: 'NFT Collection Alpha'
      },
      {
        id: '2',
        amount: 2300,
        date: '2024-02-02',
        product: 'Digital Art Series X'
      },
      {
        id: '3',
        amount: 850,
        date: '2024-02-02',
        product: 'Metaverse Land Plot'
      }
    ];
  }

  async getInsights(): Promise<Insight[]> {
    // Mock data
    return [
      {
        id: '1',
        metric: 'Total Revenue',
        value: 4650,
        trend: 'up',
        percentage: 15.5
      },
      {
        id: '2',
        metric: 'Active Users',
        value: 1200,
        trend: 'up',
        percentage: 22.3
      },
      {
        id: '3',
        metric: 'Average Transaction Value',
        value: 1550,
        trend: 'stable',
        percentage: 0.8
      }
    ];
  }
}