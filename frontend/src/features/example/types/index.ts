export interface ExampleItem {
  id: string;
  title: string;
  description: string;
  createdAt: string;
}

export interface CreateExampleInput {
  title: string;
  description: string;
}
