import useSettings from '../../hooks/useSettings';
import MatxSuspense from '../MatxSuspense';
import { MatxLayouts } from './index';

export default function MatxLayout (props) {
  const { settings } = useSettings();
  const Layout = MatxLayouts[settings.activeLayout];

  return (
    <MatxSuspense>
      <Layout {...props} />
    </MatxSuspense>
  );
}
