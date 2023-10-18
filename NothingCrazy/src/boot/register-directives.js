import ColumnDraggable from 'src/directives/ColumnDraggable';
import Resizable from 'src/directives/Resizable';

export default ({ app }) => {
  // Registering the directives globally
  app.directive('column-draggable', ColumnDraggable);
  app.directive('resizable', Resizable);
};
