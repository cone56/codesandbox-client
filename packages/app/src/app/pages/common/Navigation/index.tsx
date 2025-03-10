import * as React from 'react';
import { Observer } from 'app/componentConnectors';
import { Link } from 'react-router-dom';
import Media from 'react-media';
import {
  patronUrl,
  searchUrl,
  exploreUrl,
} from '@codesandbox/common/lib/utils/url-generator';

import SearchIcon from 'react-icons/lib/go/search';
import PlusIcon from 'react-icons/lib/go/plus';
import BellIcon from 'react-icons/lib/md/notifications';
import FlameIcon from 'react-icons/lib/go/flame';
import Row from '@codesandbox/common/lib/components/flex/Row';
import Tooltip from '@codesandbox/common/lib/components/Tooltip';
import { HeaderSearchBar } from 'app/components/HeaderSearchBar';
import { Overlay } from 'app/components/Overlay';
// @ts-ignore
import { useOvermind } from 'app/overmind';
import PatronBadge from '-!svg-react-loader!@codesandbox/common/lib/utils/badges/svg/patron-4.svg';
import { Notifications } from './Notifications';

import { SignInButton } from '../SignInButton';
import { UserMenu } from '../UserMenu';
import {
  LogoWithBorder,
  Border,
  Title,
  Actions,
  Action,
  UnreadIcon,
  TitleWrapper,
  Wrapper,
} from './elements';

interface Props {
  title: string;
  searchNoInput?: boolean;
  float?: boolean;
}

export const Navigation = ({ title, searchNoInput, float }: Props) => {
  const { state, actions } = useOvermind();
  const { isLoggedIn, isPatron, user, userNotifications } = state;
  const { modalOpened, userNotifications: userNotificationsSignals } = actions;
  return (
    <Row
      justifyContent="space-between"
      style={
        float
          ? { position: 'absolute', left: 0, top: 0, right: 0, padding: '1rem' }
          : {}
      }
    >
      <TitleWrapper>
        <a href="/?from-app=1">
          <LogoWithBorder height={35} width={35} />
        </a>
        <Border role="presentation" />
        <Title>{title}</Title>
      </TitleWrapper>
      <Wrapper>
        <Actions>
          <Action>
            <Media query="(max-width: 920px)">
              {matches =>
                matches || searchNoInput ? (
                  <Tooltip placement="bottom" content="Search All Sandboxes">
                    <Link
                      style={{ color: 'white' }}
                      to={searchUrl()}
                      aria-label="Search All Sandboxes"
                    >
                      <SearchIcon height={35} />
                    </Link>
                  </Tooltip>
                ) : (
                  <HeaderSearchBar />
                )
              }
            </Media>
          </Action>

          <Action>
            <Tooltip placement="bottom" content="Explore Sandboxes">
              <a style={{ color: 'white' }} href={exploreUrl()}>
                <FlameIcon height={35} />
              </a>
            </Tooltip>
          </Action>

          {!isPatron && (
            <Action>
              <Tooltip placement="bottom" content="Support CodeSandbox">
                <Link to={patronUrl()}>
                  <PatronBadge width={40} height={40} />
                </Link>
              </Tooltip>
            </Action>
          )}

          {user && (
            <Overlay
              isOpen={userNotifications.notificationsOpened}
              content={Notifications}
              onOpen={userNotificationsSignals.notificationsOpened}
              onClose={userNotificationsSignals.notificationsClosed}
              event="Notifications"
              noHeightAnimation
            >
              {open => (
                <Observer>
                  {({ store }) => (
                    <Action
                      as="button"
                      style={{ position: 'relative', fontSize: '1.25rem' }}
                      onClick={open}
                      aria-label={
                        store.userNotifications.unreadCount > 0
                          ? 'Show Notifications'
                          : 'No Notifications'
                      }
                    >
                      <Tooltip
                        placement="bottom"
                        content={
                          store.userNotifications.unreadCount > 0
                            ? 'Show Notifications'
                            : 'No Notifications'
                        }
                      >
                        <BellIcon height={35} />
                        {store.userNotifications.unreadCount > 0 && (
                          <UnreadIcon />
                        )}
                      </Tooltip>
                    </Action>
                  )}
                </Observer>
              )}
            </Overlay>
          )}

          <Action
            as="button"
            style={{ fontSize: '1.125rem' }}
            onClick={() =>
              modalOpened({
                modal: 'newSandbox',
              })
            }
            aria-label="New Sandbox"
          >
            <Tooltip placement="bottom" content="New Sandbox">
              <PlusIcon height={35} />
            </Tooltip>
          </Action>
        </Actions>

        {isLoggedIn ? <UserMenu /> : <SignInButton />}
      </Wrapper>
    </Row>
  );
};
