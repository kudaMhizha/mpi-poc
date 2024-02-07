import renderer from 'react-test-renderer';
import UserInviteEmail from '../UserInviteEmail';
it('renders correctly', () => {
  const tree = renderer.create(<UserInviteEmail />).toJSON();
  expect(tree).toMatchSnapshot();
});
