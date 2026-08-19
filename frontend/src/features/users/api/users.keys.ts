export const usersKeys = {
  all: ['users'] as const,
  lists: () => [...usersKeys.all, 'list'] as const,
  // Incorporate search values straight into the key factory matrix
  list: (page: number, limit: number, search: string) =>
    [...usersKeys.lists(), { page, limit, search }] as const,
};
