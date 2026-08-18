import { DataSource } from 'typeorm';
import { AuthorEntity } from '../../modules/books/entities/authors.entity';


export async function seedAuthers(dataSource: DataSource) {
  const autherRepository = dataSource.getRepository(AuthorEntity);

  const autherList:Partial<AuthorEntity>[]  = [
    {
      "name": "Saadat Hasan Manto",
      "bio": "A legendary Urdu short-story writer known for his raw, unfiltered stories about the Partition of India and Pakistan."
    },
    {
      "name": "Bano Qudsia",
      "bio": "A revered novelist and playwright famously known for her Urdu masterpiece Raja Gidh, which explores societal themes."
    },
    {
      "name": "Mohsin Hamid",
      "bio": "An internationally bestselling English novelist whose books explore modern identity, migration, and globalization."
    },
    {
      "name": "Umera Ahmed",
      "bio": "One of Pakistan's most popular contemporary fiction writers and screenwriters, best known for her novel Peer-e-Kamil."
    },
    {
      "name": "Bapsi Sidhwa",
      "bio": "Pakistan’s premier early English novelist who captured the historical weight of Partition."
    },
    {
      "name": "Intizar Hussain",
      "bio": "A masterful Urdu novelist and short-story writer who was nominated for the International Man Booker Prize."
    },
    {
      "name": "Kamila Shamsie",
      "bio": "An award-winning contemporary English novelist known for writing deeply political narratives based in cities like Karachi."
    },
    {
      "name": "Mustansar Hussain Tarar",
      "bio": "A literary icon celebrated for introducing unique creativity to Urdu travelogues and modern fiction."
    },
    {
      "name": "Abdullah Hussain",
      "bio": "An acclaimed novelist whose epic work Udaas Naslain stands as one of the greatest novels written in the Urdu language."
    },
    {
      "name": "Mohammed Hanif",
      "bio": "A former pilot turned author whose satirical English novels about political history have won global literary prizes."
    },
    {
      "name": "Ashfaq Ahmed",
      "bio": "A distinguished Urdu writer, playwright, and broadcaster revered for his profound philosophical TV dramas and spiritual storytelling."
    },
    {
      "name": "Fatima Bhutto",
      "bio": "An acclaimed contemporary novelist and journalist known for her gripping fiction and political commentary exploring history and identity."
    }
  ]

  await autherRepository.upsert(autherList, ['name']);
  console.log('Auther seeded successfully.');
}