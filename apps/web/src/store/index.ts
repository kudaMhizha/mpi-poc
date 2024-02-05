import {create} from 'zustand';
import {devtools, persist} from 'zustand/middleware';

interface MPIStore {
  companies: number;
}

const useStore = create<MPIStore>()(
  devtools(
    persist(
      (get, set) => ({
        companies: 0,
      }),
      {name: 'mpiStore'}
    )
  )
);

export default useStore;
