import '@testing-library/jest-dom'
import SignInDialog from '../__component/Dialog'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

jest.mock('../__component/states/Default', () => ({
  Default: ({ handleNext }) => (
    <div>
      <p>Default View</p>
      <button onClick={() => handleNext('Family')}>Go to Family</button>
      <button onClick={() => handleNext('Wallets')}>Go to Wallets</button>
    </div>
  ),
}))

jest.mock('../__component/states/Family', () => ({
  Family: ({ handleNext }) => (
    <div>
      <p>Family View</p>
      <button onClick={() => handleNext('Metamask')}>Go to Metamask</button>
    </div>
  ),
}))

jest.mock('../__component/states/Metamask', () => ({
  Metamask: () => <div>Metamask View</div>,
}))

jest.mock('../__component/states/Wallets', () => ({
  Wallets: () => <div>Wallets View</div>,
}))

async function openDialog() {
  const user = userEvent.setup()
  render(<SignInDialog />)
  await user.click(screen.getByRole('button', { name: /connect wallet/i }))
  return user
}

describe('Trigger button', () => {
  it('renders and is visible before interaction', () => {
    render(<SignInDialog />)
    expect(screen.getByRole('button', { name: /connect wallet/i })).toBeInTheDocument()
  })

  it('does not render dialog content on first render', () => {
    render(<SignInDialog />)
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })
})

describe('Opening the dialog', () => {
  it('opens the dialog on trigger click', async () => {
    await openDialog()
    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('always resets to the Default step when opened, regardless of prior step state', async () => {
    await openDialog()
    expect(screen.getByText('Default View')).toBeInTheDocument()
    expect(screen.getByText('Connect Wallet')).toBeInTheDocument()
  })

  it('does not show the back button on the Default step', async () => {
    await openDialog()
    const dialog = screen.getByRole('dialog')

    expect(within(dialog).queryByRole('button', { name: /go back/i })).not.toBeInTheDocument()
    expect(within(dialog).getByRole('button', { name: /ask help/i })).toBeInTheDocument()
  })
})

describe('Step navigation (handleNext)', () => {
  it('navigates from Default to Family and updates the label', async () => {
    const user = await openDialog()
    await user.click(screen.getByText('Go to Family'))

    expect(screen.getByText('Family View')).toBeInTheDocument()
    expect(screen.getByText('Sign In Email')).toBeInTheDocument()
    expect(screen.queryByText('Default View')).not.toBeInTheDocument()
  })

  it('navigates from Default to Wallets and updates the label', async () => {
    const user = await openDialog()
    await user.click(screen.getByText('Go to Wallets'))

    expect(screen.getByText('Wallets View')).toBeInTheDocument()
    expect(screen.getByText('Choose Wallet')).toBeInTheDocument()
  })

  it('navigates multiple steps deep: Default -> Family -> Metamask', async () => {
    const user = await openDialog()
    await user.click(screen.getByText('Go to Family'))
    await user.click(screen.getByText('Go to Metamask'))

    expect(screen.getByText('Metamask View')).toBeInTheDocument()
    expect(screen.getByText('Scan with MetaMask')).toBeInTheDocument()
  })
})

describe('Back button behavior', () => {
  it('shows a back button once navigated away from Default (showBack: true)', async () => {
    const user = await openDialog()
    await user.click(screen.getByText('Go to Family'))

    const dialog = screen.getByRole('dialog')
    expect(within(dialog).getByRole('button', { name: /go back/i })).toBeInTheDocument()
    expect(within(dialog).queryByRole('button', { name: /ask help/i })).not.toBeInTheDocument()
  })

  it('returns to Default step when back is clicked', async () => {
    const user = await openDialog()
    await user.click(screen.getByText('Go to Family'))
    expect(screen.getByText('Family View')).toBeInTheDocument()

    const dialog = screen.getByRole('dialog')
    await user.click(within(dialog).getByRole('button', { name: /go back/i }))

    expect(screen.getByText('Default View')).toBeInTheDocument()
    expect(screen.getByText('Connect Wallet')).toBeInTheDocument()
  })
})

describe('Closing the dialog', () => {
  it('closes when the close (X) button is clicked', async () => {
    const user = await openDialog()
    const dialog = screen.getByRole('dialog')
    await user.click(within(dialog).getByRole('button', { name: /close dialog/i }))

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('closes when Escape is pressed (Radix default behavior)', async () => {
    const user = await openDialog()
    expect(screen.getByRole('dialog')).toBeInTheDocument()

    await user.keyboard('{Escape}')

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
  })

  it('resets to Default step after closing and reopening', async () => {
    const user = await openDialog()
    await user.click(screen.getByText('Go to Family'))
    expect(screen.getByText('Family View')).toBeInTheDocument()

    await user.keyboard('{Escape}')
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /connect wallet/i }))
    expect(screen.getByText('Default View')).toBeInTheDocument()
  })
})

describe('Overlay', () => {
  it('renders an overlay when open', async () => {
    await openDialog()
    const overlay = document.querySelector('.animate-overlay')
    expect(overlay).toBeInTheDocument()
  })
})
