import { ComponentProps, ReactNode } from 'react';

import { AppSwitcher, widthQuery } from '@daohaus/ui';
import { OuterLayout } from '@daohaus/ui';
import styled from 'styled-components';
import { DaoHausNavProps } from '@daohaus/connect/components/DaoHausNav/DaoHausNav.types';
import { DaoHausNav, DaoHausNavMenu } from '@daohaus/connect';

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0rem;
  width: 100%;
  @media ${widthQuery.sm} {
    padding: 0rem;
  }
  .left-nav {
    @media ${widthQuery.sm} {
      width: 100%;
    }
  }
`;


export const MainLayout = styled.main`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 0 3.2rem 0rem 3.2rem;
  @media ${widthQuery.sm} {
    padding: 0 2.4rem 0rem 2.4rem;
  }
`;

export const DHLayout2 = ({
  children,
  appNavLinks,
  leftNav,
  footer,
}: {
  children: ReactNode;
  leftNav?: ReactNode;
  appNavLinks?: ComponentProps<typeof AppSwitcher>;
  footer?: ReactNode;
}) => {
  return (
    <OuterLayout>
      <Header>
        <div className="left-nav">
          {appNavLinks && <AppSwitcher {...appNavLinks} />}
          {leftNav}
        </div>
        <DaoHausNav />
      </Header>
      {/* <DaoHausNavMenu
        navLinks={navLinks}
        dropdownLinks={dropdownLinks}
        dropdownTriggerLabel={dropdownTriggerLabel}
        pathname={pathname}
      /> */}
      <MainLayout>{children}</MainLayout>
      {footer}
    </OuterLayout>
  );
};