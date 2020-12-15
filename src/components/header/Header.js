
import HeaderBg from './subcomponents/HeaderBg'
import HeaderFlexContainer from './subcomponents/HeaderFlexContainer'
import HeaderTitle from './subcomponents/HeaderTitle'
import HeaderMenu from './subcomponents/HeaderMenu'

const Header = () => {

  return (
    <HeaderBg>
      <HeaderFlexContainer>

        <HeaderTitle title={'NeYesek'} />

        <HeaderMenu />

      </HeaderFlexContainer>
    </HeaderBg>
  );
}

export default Header;