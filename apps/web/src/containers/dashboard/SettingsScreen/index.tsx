import {motion} from 'framer-motion';
import {Helmet} from 'react-helmet-async';

function SettingsScreen() {
  return (
    <>
      <Helmet>
        <title>Settings</title>
      </Helmet>

      <div className="max-w-2xl space-y-4">
        <motion.h1
          initial={{opacity: 0, x: -50}}
          animate={{opacity: 1, x: 0}}
          className="text-4xl font-bold tracking-tight"
        >
          Settings
        </motion.h1>
      </div>
    </>
  );
}

export default SettingsScreen;
