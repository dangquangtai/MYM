import { useContext } from 'react';
import PodcastContext from '../contexts/PodcastContext';
const usePodcast = () => useContext(PodcastContext);

export default usePodcast;
