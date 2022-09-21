import axios from 'axios';

const posAPI = {
  async getPosList(langId: string) {
    const { data } = await axios.get<Model.POSList[]>(`/pos/list/${langId}`);
    return data;
  },

  async getPosByLangAndName(langId: string, posOrder: number) {
    const { data } = await axios.get<Model.POS>(
      `/pos?lang=${langId}&order=${posOrder}`
    );
    return data;
  },

  async createPos(obj: MutationParams) {
    const { data } = await axios.post<Model.POSTable>('/pos', obj?.body ?? {});
    return data;
  }
};

export default posAPI;
