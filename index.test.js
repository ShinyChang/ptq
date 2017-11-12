import Queue from './index'

test('queue can be resolved', async () => {
  const mockTask = jest.fn((num) => Promise.resolve(num))
  const queue = [1, 2, 3, 4, 5]

  const expectedResult = [...queue]
  const expectedLength = queue.length

  await expect(new Queue(queue, mockTask).start()).resolves.toEqual(expectedResult)
  expect(mockTask.mock.calls.length).toBe(expectedLength)
  expect(queue.length).toEqual(expectedLength)
})

