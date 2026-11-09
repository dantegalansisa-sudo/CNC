import { useNavigate } from 'react-router-dom';
import { scrollToId } from './scroll';

/** Go to a section: scroll if it is on this page, otherwise open the home page at that section. */
export function useGo() {
  const navigate = useNavigate();
  return (id: string) => {
    if (!scrollToId(id)) navigate(`/#${id}`);
  };
}
