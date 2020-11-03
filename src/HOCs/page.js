import withUser from '../lib/magic/with-user';
import withLayout from './withLayout';

const compose = (...fns) => (Component) =>
  fns.reduceRight((res, fn) => fn(res), Component);

const page = compose(withUser, withLayout);

export default page;
