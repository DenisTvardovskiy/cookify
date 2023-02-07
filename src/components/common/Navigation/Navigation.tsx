import React, { FC } from "react";
import { Avatar, Button } from "@mui/material";

import { Container } from "../../shared/Container";
import useStyles from "./style";
import { Logo } from "../../shared/Logo";
import { useAuthorization } from "../../../hooks";
import { Link, NavLink } from "react-router-dom";

interface IProps {}

export const Navigation: FC = (props: IProps): JSX.Element => {
  const { isAuthorized, resetAuthorization } = useAuthorization();
  const classes = useStyles();

  const { user } = useAuthorization();

  return (
    <Container whiteStyle>
      <nav className={classes.navigation}>
        <div className={classes.navWrapper}>
          <Link to="/">
            <Logo />
          </Link>
          <NavLink
            style={({ isActive }) => isActive ? { borderBottom: "1px solid blue" } : undefined}
            to="/"
            end
          >Рецепти</NavLink>
          <NavLink
            style={({ isActive }) => isActive ? { borderBottom: "1px solid blue" } : undefined}
            to="/ingredients"
            end
          >Інгредієнти</NavLink>
          <NavLink
            style={({ isActive }) => isActive ? { borderBottom: "1px solid blue" } : undefined}
            to="/storage"
            end
          >Сховок</NavLink>
        </div>

        {!isAuthorized ? (
          <div className={classes.navWrapper}>
            <Button variant="outlined">
              <Link to="/sign-in">Увійти</Link>
            </Button>
          </div>
        ) : (
          <div className={classes.accountWrap}>
            <Button variant="outlined" onClick={resetAuthorization}>
              Вийти
            </Button>
            <Link to="/profile">
              <Avatar className={classes.avatar} alt={user?.username} src={user?.avatarImageLink} />
            </Link>
          </div>
        )}
      </nav>
    </Container>
  );
};
