import { DataSource } from 'typeorm';
import { PublishersEntity } from '../../modules/books/entities/publishers.entity';
  
export async function seedPublishers(dataSource: DataSource) {
  const publisherRepository = dataSource.getRepository(PublishersEntity);

  const publisherList:Partial<PublishersEntity>[] = [
    {
      "name": "Sang-e-Meel Publications",
      "desc": "One of Pakistan's oldest and most prestigious publishing houses based in Lahore, known for publishing the definitive Urdu Ashfaq Ahmed."
    },
    {
      "name": "Penguin Random House",
      "desc": "The world's largest trade book publisher, responsible for printing and distributing the globally acclaimed English novels of modern Pakistani authors."
    },
    {
      "name": "Alif Publishers",
      "desc": "A major contemporary Pakistani publishing house that handles the publication, printing, and official distribution of Umera Ahmed’s."
    },
    {
      "name": "Granta Books",
      "desc": "A renowned literary publisher based in the UK that famously discovered and published the early debut masterpieces of Kamila Shamsie."
    },
    {
      "name": "Oxford University Press Pakistan",
      "desc": "The Pakistani branch of the famous global academic press, highly respected for publishing literary fiction, historical retrospectives."
    },
    {
      "name": "Maktaba-e-Daniyal",
      "desc": "A legendary Karachi-based publishing house deeply tied to Pakistan's literary history, famously known for printing the definitive Urdu works."
    },
    {
      "name": "Ferozsons Limited",
      "desc": "A historic, multi-generational Pakistani printing and publishing company that has kept classic Urdu fiction, historical epics,."
    },
    {
      "name": "Bloomsbury Publishing",
      "desc": "A leading independent global publisher that manages the international distribution and award-winning editions of modern Pakistani literary fiction."
    },
    {
      "name": "Hamish Hamilton",
      "desc": "An elite literary imprint of Penguin Books that specifically focuses on high-brow, thought-provoking fiction, including the award-winning hardback releases."
    },
    {
      "name": "Jhelum Book Corner",
      "desc": "A highly active and respected contemporary Pakistani publisher known for producing premium-quality prints and special editions of modern Urdu fiction and travelogues."
    },
    {
      "name": "Vintage Books",
      "desc": "A prominent global paperback imprint that handles the accessible, mass-market editions of translated classic Urdu literature, including Saadat Hasan Manto's."
    },
    {
      "name": "Milkweed Editions",
      "desc": "An acclaimed independent literary press that specializes in bringing translated South Asian masterworks—including iconic novels by Urdu writers."
    }
  ]

  await publisherRepository.upsert(publisherList, ['name']);
  console.log('Publishers seeded successfully.');
}


