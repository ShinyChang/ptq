import Queue from './index'

test('queue can be resolved', async () => {
  const mockTask = jest.fn().mockReturnValue(Promise.resolve())
  const queue = [1, 2, 3, 4, 5]
  const expectedLength = queue.length
  await expect(new Queue(queue, mockTask).start()).resolves.toBeUndefined()
  expect(mockTask.mock.calls.length).toBe(expectedLength)
  expect(queue.length).toEqual(expectedLength)
})
