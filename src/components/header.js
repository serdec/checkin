import Link from 'next/link';
import React from 'react';
import PropTypes from 'prop-types';
import withUser from '../lib/magic/with-user';

const Header = ({ user, signOut }) => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          {user.isSignedIn ? (
            <>
              <li>
                <Link href="/profile">
                  <a>Profile</a>
                </Link>
              </li>
              <li>
                <button className="headerBtn" onClick={signOut}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link href="/login">
                <a>Login</a>
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <style jsx>{`
        nav {
          max-width: 42rem;
          margin: 0 auto;
          padding: 0.2rem 1.25rem;
        }
        ul {
          display: flex;
          list-style: none;
          margin-left: 0;
          padding-left: 0;
        }
        li {
          margin-right: 1rem;
        }
        li:first-child {
          margin-left: auto;
        }
        a {
          color: #fff;
          text-decoration: none;
          font-size: 1em;
        }
        header {
          color: #fff;
          background-color: #333;
        }
        .headerBtn {
          background: none;
          border: none;
          color: #fff;
          text-decoration: none;
          max-width: 42rem;
          font-size: 1em;
          padding: 0;
          cursor: pointer;
        }
      `}</style>
    </header>
  );
};

Header.propTypes = {
  user: PropTypes.object,
  signOut: PropTypes.func,
};

export default withUser(Header);
