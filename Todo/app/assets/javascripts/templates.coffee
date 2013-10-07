define(
  () =>
    task:'''
    <div class="task">
    <button class="btn btn-danger btn-delete" data-id="{{ id }}">&times;</button>
    {{ label }}
    </div>
    '''
)
