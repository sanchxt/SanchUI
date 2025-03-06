jest.mock('lucide-react', () => ({
  ChevronRight: function ChevronRight(props: any) {
    return <div data-testid="chevron-right-icon" {...props} />;
  },
  MoreHorizontal: function MoreHorizontal(props: any) {
    return <div data-testid="more-horizontal-icon" {...props} />;
  },
  Home: function Home(props: any) {
    return <div data-testid="home-icon" {...props} />;
  },
}));

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
} from './index';

describe('Breadcrumb Component', () => {
  it('renders basic breadcrumb correctly', () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
            <BreadcrumbSeparator />
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="/components">Components</BreadcrumbLink>
            <BreadcrumbSeparator />
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );

    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('navigation')).toHaveAttribute(
      'aria-label',
      'Breadcrumb'
    );
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Components')).toBeInTheDocument();
    expect(screen.getByText('Breadcrumb')).toBeInTheDocument();
    expect(screen.getAllByTestId('chevron-right-icon')).toHaveLength(2);
  });

  it('sets current page correctly', () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
            <BreadcrumbSeparator />
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbPage>Current Page</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );

    const currentPage = screen.getByText('Current Page');
    expect(currentPage).toBeInTheDocument();
    expect(currentPage.parentElement).toHaveAttribute('aria-current', 'page');
  });

  it('renders custom separator correctly', () => {
    render(
      <Breadcrumb separator="/">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
            <BreadcrumbSeparator />
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbPage>Page</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );

    expect(screen.getByText('/')).toBeInTheDocument();
  });

  it('shows home icon when enabled', () => {
    render(
      <Breadcrumb showHomeIcon>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" isRoot>
              Home
            </BreadcrumbLink>
            <BreadcrumbSeparator />
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbPage>Page</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );

    expect(screen.getByTestId('home-icon')).toBeInTheDocument();
  });

  it('collapses items when there are too many', () => {
    render(
      <Breadcrumb collapsible maxItems={3}>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
            <BreadcrumbSeparator />
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="/level1">Level 1</BreadcrumbLink>
            <BreadcrumbSeparator />
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="/level1/level2">Level 2</BreadcrumbLink>
            <BreadcrumbSeparator />
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href="/level1/level2/level3">
              Level 3
            </BreadcrumbLink>
            <BreadcrumbSeparator />
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbPage>Current Page</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );

    expect(screen.getByTestId('more-horizontal-icon')).toBeInTheDocument();
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Current Page')).toBeInTheDocument();
    // middle items should be collapsed
    expect(screen.queryByText('Level 2')).not.toBeInTheDocument();
  });

  it('applies custom classes correctly', () => {
    render(
      <Breadcrumb className="custom-breadcrumb-class">
        <BreadcrumbList className="custom-list-class">
          <BreadcrumbItem className="custom-item-class">
            <BreadcrumbLink href="/" className="custom-link-class">
              Home
            </BreadcrumbLink>
            <BreadcrumbSeparator className="custom-separator-class" />
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbPage className="custom-page-class">Page</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );

    expect(screen.getByRole('navigation')).toHaveClass(
      'custom-breadcrumb-class'
    );
    expect(screen.getByRole('list')).toHaveClass('custom-list-class');
    expect(screen.getByText('Home').closest('li')).toHaveClass(
      'custom-item-class'
    );
    expect(screen.getByText('Home').closest('a')).toHaveClass(
      'custom-link-class'
    );
    expect(screen.getByText('Page')).toHaveClass('custom-page-class');

    const separator = screen.getByTestId('breadcrumb-separator');
    expect(separator).toHaveClass('custom-separator-class');
  });

  it('handles click events on breadcrumb links', async () => {
    const handleClick = jest.fn();
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" onClick={handleClick}>
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );

    await userEvent.click(screen.getByText('Home'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('ellipsis displays the number of collapsed items', () => {
    render(<BreadcrumbEllipsis count={3} />);

    expect(screen.getByText('3')).toBeInTheDocument();
    expect(
      screen.getByLabelText('3 more breadcrumb levels')
    ).toBeInTheDocument();
  });

  it('handles zero count in ellipsis correctly', () => {
    render(<BreadcrumbEllipsis count={0} />);

    expect(screen.queryByText('0')).not.toBeInTheDocument();
    expect(
      screen.getByLabelText('0 more breadcrumb levels')
    ).toBeInTheDocument();
  });

  it('applies truncation to long breadcrumb items', () => {
    render(
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">
              Very Long Home Page Title That Should Be Truncated
            </BreadcrumbLink>
            <BreadcrumbSeparator />
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbPage>
              Another Very Long Page Title That Should Also Be Truncated
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );

    const longLink = screen.getByText(
      'Very Long Home Page Title That Should Be Truncated'
    );
    const longPage = screen.getByText(
      'Another Very Long Page Title That Should Also Be Truncated'
    );

    expect(longLink.closest('span')).toHaveClass('truncate');
    expect(longPage).toHaveClass('truncate');
  });
});
