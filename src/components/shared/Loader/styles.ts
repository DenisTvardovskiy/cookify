import { createUseStyles } from 'react-jss'

export default createUseStyles(() => ({
  container: {
    position: 'relative',
    flex: 1,
  },
  wrapper: {
    position: "fixed",
    top: 0,
    right: 0,
    width: "100%",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    zIndex: "3000",
    visibility: "hidden",
    opacity: 0,
    background: "transparent",
    transition: "all ease 0.4s",
  },
  visible: {
    visibility: "visible",
    opacity: 1,
    background: "rgba(33, 37, 41, 0.8)",
    transition: "all ease 0.4s",
  },
  message: {
    color: "#ffffff",
    fontSize: "16px",
    height: "30px",
    maxWidth: "300px",
    textAlign: "center",
  }
}))