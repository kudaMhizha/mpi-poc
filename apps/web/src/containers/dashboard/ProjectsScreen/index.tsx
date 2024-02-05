import {Tabs} from '@mpi-app/ui';
import {motion} from 'framer-motion';
import {Helmet} from 'react-helmet-async';

function ProjectsScreen() {
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      <Tabs value="grid" className="space-y-4">
        <div className="flex items-center justify-between">
          <motion.h1
            initial={{opacity: 0, x: -50}}
            animate={{opacity: 1, x: 0}}
            className="text-4xl font-bold tracking-tight"
          >
            Dashboard
          </motion.h1>
        </div>
      </Tabs>
    </>
  );
}

export default ProjectsScreen;
