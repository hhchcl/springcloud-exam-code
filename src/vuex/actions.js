export const setHeaderInformation = ({commit}, status) => {
  commit('HEADERINFORMATION',status)
}

export const setHeaderMenu = ({commit}, status) => {
  commit('HEADERMENU',status)
}
export const setFooterHasMarginTop = ({commit}, status) => {
  commit('FOOTERHASMARGINTOP',status)
}