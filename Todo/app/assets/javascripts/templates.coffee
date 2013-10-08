define(
  () =>
    task:'''
    <div class="task">
    <span class="label-task">{{ label }}</label>
    <button class="btn btn-danger btn-delete" data-id="{{ id }}">&times;</button>
    </div>
    '''
)
