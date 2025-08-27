import { RouteFromDb } from '../types/RoutesTypes';

export default function sortRouteCollaborators(data: RouteFromDb) {
  if (data) {
    data.collaborators.sort((a, b) => {
      if (a.routes_collaborators.boardingTime > b.routes_collaborators.boardingTime) {
        return 1;
      }
      if (a.routes_collaborators.boardingTime < b.routes_collaborators.boardingTime) {
        return -1;
      }
      return 0;
    });
  }
}
