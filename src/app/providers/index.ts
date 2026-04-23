import { withStore } from './RTK';
import { withToastify } from './toastify';
import { compose } from '~shared/lib';

export const withProviders = compose(withStore, withToastify);
