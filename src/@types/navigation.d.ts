export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      new: undefined;
      pools: undefined;
      find: undefined; // quando a rota não tem parâmetro é só definir como undefined.
      details: { // quando a rota precisa de parâmetro é só definir um objeto com as propriedades necessárias.
        id: string;
      }
    }
  }
}