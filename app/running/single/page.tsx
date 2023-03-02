import { getSingleRuns } from '../../../database/singleRuns';
import SingleRun from './SingleRun';

// import styles from './page.module.scss';

export const metadata = {
  title: 'Single runner',
  description: 'Buddy for running',
};

export default async function SinglePage() {
  const singleRuns = await getSingleRuns();

  return <SingleRun singleRuns={singleRuns} />;
}
