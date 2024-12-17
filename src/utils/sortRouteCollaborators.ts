import { RouteType } from '../types/Routes';

export default function sortRouteCollaborators(data: RouteType) {
  if (data) {
    data.collaborators.sort((a, b) => {
      if (a.boardingTime > b.boardingTime) {
        return 1;
      }
      if (a.boardingTime < b.boardingTime) {
        return -1;
      }
      return 0;
    });
  }
}
