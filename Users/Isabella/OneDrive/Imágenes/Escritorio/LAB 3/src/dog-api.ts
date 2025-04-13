export interface DogBreed{
    id: string;
    male_weight: {min: number, max: number};
    life: {min: number, max: number};
    attributes: {
        name: string;
        description: string;
    };
}

export async function fetchBreeds(): Promise<DogBreed[]> {
    const response = await fetch('https://dogapi.dog/api/v2/breeds?page[number]=1');
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    console.log(data.data);
    return data.data;
}

export async function fetchBreed(id: string): Promise<DogBreed> {
    const response = await fetch(`https://dogapi.dog/api/v2/breeds/${id}`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.data;
}


